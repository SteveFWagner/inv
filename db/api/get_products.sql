SELECT products.id, products.name, products.on_hand, SUM(materials.cost_per_uom*qty) AS material_cost, SUM((materials.cost_per_uom*qty)*products.on_hand) AS cost_on_hand
FROM products
JOIN product_templates on products.id = product_templates.product_id
JOIN materials on product_templates.material_id = materials.id
GROUP BY products.id