SELECT SUM((products.on_hand*qty)*cost_per_uom)
FROM products
JOIN product_templates on products.id = product_templates.product_id
JOIN materials on product_templates.material_id = materials.id