
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
)

CREATE TABLE materials(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    uom VARCHAR(20),
    cost_per_uom NUMERIC(10,2),
    on_hand int,
    order_point int
)


CREATE TABLE product_templates(
    product_id int REFERENCES products(id),
    material_id int REFERENCES materials(id),
    qty int
)

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    on_hand int
)

INSERT INTO materials 
    (name, uom, cost_per_uom, on_hand, order_point)
VALUES 
    ('yellow gold 24k', 'gm', 40, 100, 20),
    ('Silver', 'gm', 1, 100, 25),
    ('Platinum', 'gm', 26, 100, 25),
    ('Palladium', 'gm', 50, 100, 15)

INSERT INTO products
    (name, on_hand)
VALUES
    ('ring1', 1),
    ('ring2', 1);

INSERT INTO product_templates
    (product_id, material_id, qty)
VALUES
    (1,1,2),
    (2,1,2),
    (2,2,1);

