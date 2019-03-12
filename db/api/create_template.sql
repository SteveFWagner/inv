INSERT INTO product_templates
    (product_id, material_id, qty)
VALUES
    ($1,$2,$3)

RETURNING product_id