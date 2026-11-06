"""Build an itinerary from a pool of spots based on the traveler's form input."""

import math
from collections import Counter
from typing import Dict, List, Optional, Tuple

SPOTS_PER_DAY = {"relaxed": 2, "balanced": 3, "packed": 4}
BUDGET_MULTIPLIER = {"budget": 0.7, "comfort": 1.0, "luxury": 2.2}

NOTE_INTEREST_KEYWORDS = {
    "pantai": ["pantai", "laut", "snorkel", "diving", "pulau"],
    "alam": ["alam", "gunung", "air terjun", "hiking", "trekking", "bukit", "danau"],
    "budaya": ["budaya", "candi", "pura", "museum", "sejarah", "keraton", "adat"],
    "kuliner": ["kuliner", "makan", "halal", "seafood", "kopi"],
    "sunset": ["sunset", "senja"],
}
RELAXED_NOTE_KEYWORDS = ["santai", "balita", "lansia", "anak kecil", "orang tua"]
PACKED_NOTE_KEYWORDS = ["padat", "sebanyak mungkin", "full day"]


def interpret_note(note: Optional[str]) -> Tuple[List[str], Optional[str]]:
    """Return the interests and pace implied by the free-text note, using keywords."""
    text = (note or "").lower()
    interests = [
        interest
        for interest, keywords in NOTE_INTEREST_KEYWORDS.items()
        if any(keyword in text for keyword in keywords)
    ]
    pace = None
    if any(keyword in text for keyword in RELAXED_NOTE_KEYWORDS):
        pace = "relaxed"
    elif any(keyword in text for keyword in PACKED_NOTE_KEYWORDS):
        pace = "packed"
    return interests, pace


def _distance_km(a: Dict, b: Dict) -> float:
    if None in (a.get("lat"), a.get("lng"), b.get("lat"), b.get("lng")):
        return float("inf")
    lat1, lon1, lat2, lon2 = map(math.radians, (a["lat"], a["lng"], b["lat"], b["lng"]))
    h = (
        math.sin((lat2 - lat1) / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin((lon2 - lon1) / 2) ** 2
    )
    return 6371 * 2 * math.asin(math.sqrt(h))


def _order_as_route(spots: List[Dict]) -> List[Dict]:
    """Order spots by nearest neighbour so that consecutive stops stay close together."""
    if not spots:
        return []
    remaining = list(spots)
    route = [remaining.pop(0)]
    while remaining:
        nearest = min(remaining, key=lambda spot: _distance_km(route[-1], spot))
        remaining.remove(nearest)
        route.append(nearest)
    return route


def select_spots(pool: List[Dict], interests: List[str], days: int, needed: int) -> List[Dict]:
    """Pick the spots for a trip, favouring those that match the traveler's interests."""
    wanted = set(interests)

    def match_count(spot: Dict) -> int:
        return len(wanted.intersection(spot.get("categories") or []))

    ranked = sorted(
        pool,
        key=lambda spot: (match_count(spot), spot.get("rating") or 0),
        reverse=True,
    )
    matching = [spot for spot in ranked if match_count(spot) > 0]
    # Stay on theme when the matches alone can fill at least two stops a day.
    candidates = matching if len(matching) >= days * 2 else ranked
    return candidates[:needed]


def build_personalized_itinerary(
    meta: Dict,
    pool: List[Dict],
    days: int,
    pace: str,
    budget_tier: str,
    interests: List[str],
) -> Dict:
    """Assemble the API response. `meta["base_costs"]` must be the comfort-tier rates."""
    per_day = SPOTS_PER_DAY.get(pace, SPOTS_PER_DAY["balanced"])
    selected = select_spots(pool, interests, days, days * per_day)
    route = _order_as_route(selected)
    selected_names = {spot["name"] for spot in selected}

    short_name = meta["region_name"].split(",")[0]
    base, extra = divmod(len(route), days)
    itinerary_days = []
    cursor = 0
    for day in range(1, days + 1):
        count = base + (1 if day <= extra else 0)
        day_spots = [
            {**spot, "id": f"spot_{day}_{index + 1}"}
            for index, spot in enumerate(route[cursor:cursor + count])
        ]
        cursor += count
        zones = Counter(spot["zone"] for spot in day_spots if spot.get("zone"))
        if zones:
            zone = zones.most_common(1)[0][0]
        elif day_spots:
            zone = f"Jelajah {short_name} - Hari {day}"
        else:
            zone = "Hari Bebas"
        itinerary_days.append({"day": day, "zone": zone, "spots": day_spots})

    multiplier = BUDGET_MULTIPLIER.get(budget_tier, 1.0)
    alternatives = [
        {**spot, "id": f"alt_{index + 1}"}
        for index, spot in enumerate(s for s in pool if s["name"] not in selected_names)
    ]
    return {
        "region_name": meta["region_name"],
        "quick_desc": meta.get("quick_desc", ""),
        "center_lat": meta.get("center_lat"),
        "center_lng": meta.get("center_lng"),
        "zoom": meta.get("zoom", 10),
        "best_season": meta.get("best_season", ""),
        "tips": meta.get("tips", []),
        "base_costs": {
            key: int(value * multiplier) for key, value in meta["base_costs"].items()
        },
        "days": itinerary_days,
        "alternatives": alternatives,
    }
