UPDATE materials
SET on_hand = on_hand-$1
WHERE id = $2