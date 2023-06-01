export const checkParams = (req, res, next) => {
   if (req.params.id === 'undefined') {
      return res.send({ data: [] })
   }
   next()
}
