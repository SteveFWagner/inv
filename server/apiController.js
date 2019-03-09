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
    createTemplate: (req,res) =>{
        
    },
    createMaterial: (req,res) =>{
        //adding in a new material to inventory -- check name against current materials and stop the add if it already exists
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
    updateOnhandMaterial: (req,res) =>{
        
    },
    updateOnhandProduct: (req,res) =>{
        
    },
    deleteMaterial: (req,res) =>{
        
    },
    deleteTemplate: (req,res) =>{
        
    }
}