"""
Risk Engine Service (Member 2 AI / Risk Engine)
Calculates multi-factor weighted risk scores and predicts overflow hours.
"""

def calculate_weighted_risk_score(zone: dict) -> dict:
    """
    Weighted Risk Score Formula:
    Waste Volume         35%
    Fill Level           25%
    Population/Activity  15%
    Historical Pattern   15%
    Time Since Pickup    10%
    """
    capacity = zone.get("capacity", 5000) or 5000
    current_waste = zone.get("current_waste", 3000)
    fill = zone.get("fill", 70)
    activity = zone.get("activity", 60)
    historical_score = zone.get("historical_score", fill * 0.95)
    pickup_delay_mins = zone.get("pickup_delay_minutes", 0)

    # Individual component scores (0 - 100)
    waste_volume_score = min(100.0, max(0.0, (current_waste / capacity) * 100.0))
    fill_score = min(100.0, max(0.0, float(fill)))
    activity_score = min(100.0, max(0.0, float(activity)))
    hist_score = min(100.0, max(0.0, float(historical_score)))
    delay_score = min(100.0, max(0.0, (pickup_delay_mins / 60.0) * 100.0))

    # Weighted composite score
    total_score = round(
        (waste_volume_score * 0.35) +
        (fill_score * 0.25) +
        (activity_score * 0.15) +
        (hist_score * 0.15) +
        (delay_score * 0.10),
        1
    )

    # Risk band mapping
    if total_score >= 80:
        band = "CRITICAL"
        color = "red"
        badge = "🔴 CRITICAL"
    elif total_score >= 60:
        band = "HIGH"
        color = "orange"
        badge = "🟠 HIGH"
    elif total_score >= 30:
        band = "MEDIUM"
        color = "amber"
        badge = "🟡 MEDIUM"
    else:
        band = "LOW"
        color = "green"
        badge = "🟢 LOW"

    growth_rate = zone.get("growth_rate_per_hour", 2.0)
    remaining_fill = max(0.0, 100.0 - fill)
    hours_to_overflow = round(remaining_fill / growth_rate, 1) if growth_rate > 0 else 24.0

    return {
        "zone_id": zone.get("id"),
        "zone_name": zone.get("name"),
        "total_risk_score": total_score,
        "risk_band": band,
        "badge": badge,
        "color": color,
        "hours_to_overflow": hours_to_overflow,
        "breakdown": {
            "waste_volume_35": round(waste_volume_score * 0.35, 1),
            "fill_level_25": round(fill_score * 0.25, 1),
            "activity_15": round(activity_score * 0.15, 1),
            "historical_15": round(hist_score * 0.15, 1),
            "pickup_delay_10": round(delay_score * 0.10, 1)
        }
    }

def predict_zone_overflow(current_fill: float, growth_rate_per_hour: float, hours: float) -> float:
    """
    Step 4: Overflow Prediction Formula:
    predicted_fill = current_fill + (growth_rate * hours)
    """
    return min(100.0, round(current_fill + (growth_rate_per_hour * hours), 1))
