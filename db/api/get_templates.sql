SELECT products.id as id, products.name as name, products.on_hand as on_hand, materials.id as material_id, materials.name as material_name, product_templates.qty, uom
FROM product_templates
JOIN products on products.id = product_templates.product_id
JOIN materials on materials.id = product_templates.material_id

