INSERT INTO materials 
    (name, uom, cost_per_uom, on_hand, order_point)
VALUES 
    ($1, $2, $3, $4, $5)

RETURNING id, name