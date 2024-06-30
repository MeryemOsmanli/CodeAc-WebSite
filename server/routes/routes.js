const BlogRouter = require("./blog.routes")
const ContactRouter = require("./contact.routes")
const FaqRouter = require("./faq.routes")
// const OrderRouter = require("./order.routes")
const ProductRouter = require("./product.routes")
// const SubscriberRouter = require("./subscriber.routes")
const UserRouter = require("./user.routes")

const router = {
    faq: FaqRouter,
    // subscribers:SubscriberRouter,
    contact:ContactRouter,
    users:UserRouter,
    products:ProductRouter,
    // orders:OrderRouter,
    blogs:BlogRouter
}
module.exports = router