UPDATE materials
SET 
    on_hand = $2,
    order_point = $3,
    cost_per_uom = $4,
    uom = $5
WHERE id = $1