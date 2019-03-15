UPDATE products
SET 
    on_hand = $2
WHERE id = $1