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
    createTemplate: (req,res) =>{
        
    },
    createMaterial: (req,res) =>{
        
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