SELECT product_id, products.name AS product_name, material_id, materials.name AS material_name, materials.uom,qty, materials.cost_per_uom, (cost_per_uom*qty) as material_cost
FROM product_templates
JOIN products ON products.id = product_templates.product_id
JOIN materials ON materials.id = product_templates.material_id