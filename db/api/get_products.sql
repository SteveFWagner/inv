SELECT product_id, products.name AS product_name, (cost_per_uom*qty) as material_cost, products.on_hand, ((cost_per_uom*qty)*products.on_hand) as cost_on_hand
FROM product_templates
JOIN products ON products.id = product_templates.product_id
JOIN materials ON materials.id = product_templates.material_id

