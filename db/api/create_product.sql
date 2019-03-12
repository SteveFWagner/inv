INSERT INTO products 
    (name, on_hand)
VALUES
    ($1, $2)

RETURNING id, name