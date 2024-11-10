export function index(req, res, next){
    res.render('createItem')
}

export async function postNew(req, res, next) {
    try {
      const userId = req.session.userID
      const { name, age } = req.body
  
      // TODO validaciones
  
      // creo una instancia de agente en memoria
      const agent = new Agent({
        name,
        age,
        owner: userId
      })
  
      // la guardo en base de datos
      await agent.save()
  
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }