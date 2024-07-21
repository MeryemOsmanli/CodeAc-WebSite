const BlogRouter = require("./blog.routes")
const ContactRouter = require("./contact.routes")
const FaqRouter = require("./faq.routes")
const OrderRouter = require("./order.routes")
const ProductRouter = require("./product.routes")
const SubscriberRouter = require("./subscribes.routes")
const UserRouter = require("./user.routes")
const OurTeamRouter = require("./ourTeam.routes")


const router = {
    faq: FaqRouter,
    ourTeam:OurTeamRouter,
    subscribers:SubscriberRouter,
    contact:ContactRouter,
    users:UserRouter,
    products:ProductRouter,
    orders:OrderRouter,
    blogs:BlogRouter
}

module.exports = router