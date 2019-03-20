SELECT materials.id, materials.name, uom, cost_per_uom, materials.on_hand, product_id, qty, products.name as product_name, products.on_hand as product_on_hand
FROM materials
JOIN product_templates ON materials.id = product_templates.material_id
JOIN products ON product_templates.product_id = products.id