module.exports={
    getMaterials: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_materials()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getProducts: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_products()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getOverview: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_overview()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getTemplates: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_templates()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getMaterialsTotalCost: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_materials_total_cost()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getMaterialsUniqueCount: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_materials_unique_count()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getProductsTotalCost: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_products_total_cost()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    getProductsUniqueCount: (req,res) =>{
        const db = req.app.get('db')
        db.api.get_products_unique_count()
        .then(resp => {res.status(200).send(resp)})
        .catch(err => console.log(err))
    },
    createTemplate: (req,res) =>{
        const db = req.app.get('db')
        const {productName, addMatIds} = req.body
        db.api.check_products(productName)
        .then(resp =>{
            if(resp.length){
                res.status(409).send('Duplicate Product Name Found.')
            }else{
                db.api.create_product(productName, 0)
                .then(response => {
                    console.log(response)
                    const {id} = response[0]
                    console.log(id)
                    const materials = addMatIds.map(material => {
                        material.product_id = id
                        return material
                    })
                    console.log(materials)
                    let materialsAdded = 0
                    for(let i = 0;i<materials.length;i++){
                        const {product_id, id, qty} = materials[i]
                        db.api.create_template(product_id, id, qty)
                        .then(()=>{
                            materialsAdded++
                            if(materialsAdded == materials.length){
                                res.sendStatus(200)
                            }
                        }).catch(err => console.log(err))
                    } 
                }).catch(err => console.log(err))
            }
        })
    },
    createMaterial: (req,res) =>{
        const db = req.app.get('db')
        const {name, uom, cost_per_uom, on_hand, order_point} = req.body
        db.api.check_materials(name)
        .then(resp => {
            console.log({resp}, resp.length)
            if(resp.length){
                res.status(409).send('Duplicate Material Found.')
            }else{
                console.log('Add this one')
                db.api.create_material(name, uom, cost_per_uom, on_hand, order_point)
                .then(response => {
                    console.log('Added Material!', {response})
                    res.status(200).send(response)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })

    },
    createProducts: (req,res) =>{
        //Note for later: account for negative material onhands
        const db = req.app.get('db')
        const {id:productId} = req.params
        const {materials, qtyToProduce} = req.body
        Promise.all([
            db.api.update_onhand_product_for_create(qtyToProduce, productId),
            materials.forEach(material =>{
                const qty = material.qty*qtyToProduce
                const id = material.material_id
                db.api.update_onhand_material_for_create(qty, id)
            })])
        .then(
            res.status(200).send(`Inventory updated for Product ${productId} and required materials.`)
        )
    },
    updateOnhandMaterial: (req,res) =>{
        const db = req.app.get('db')
        const {id} = req.params
        const {onHand:on_hand, orderPoint:order_point, cost:cost_per_uom, unit:uom} = req.body
        console.log({id},{on_hand}, {order_point}, {cost_per_uom}, {uom} )
        db.api.update_onhand_material(id, on_hand, order_point, cost_per_uom, uom)
        .then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    },
    updateOnhandProduct: (req,res) =>{
        const db = req.app.get('db')
        const {id} = req.params
        const {onHand:on_hand} = req.body
        console.log({id},{on_hand})
        db.api.update_onhand_product(id, on_hand)
        .then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        }) 
    },
    deleteMaterial: (req,res) =>{
        
    },
    deleteTemplate: (req,res) =>{
        
    }
}