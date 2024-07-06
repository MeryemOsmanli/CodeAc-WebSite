const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProductModel = require("../models/product.model");
const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await UserModel.find({}).populate("wishlist");
      res.status(200).send(users);
    } catch (err) {
      res.status(404).send("Error In Getting All Users" + err);
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id).populate("wishlist");
      res.status(200).send(user);
    } catch (err) {
      res.status(404).send("Error In Getting User" + err);
    }
  },
  login: async (req, res) => {
    try {
      const { gmail, password } = req.body;
      const user = await UserModel.findOne({ gmail: gmail }).populate(
        "wishlist"
      );
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).send({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          gmail: user.gmail,
          profileImage: user.profileImage,
          isAdmin: user.isAdmin,
          isLogin: user.isLogin,
          password: user.password,
          wishlist: user.wishlist,
          basket: user.basket,
          token: await generateToken({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            gmail: user.gmail,
            profileImage: user.profileImage,
            isAdmin: user.isAdmin,
            isLogin: user.isLogin,
            password: user.password,
            wishlist: user.wishlist,
            basket: user.basket,
          }),
        });
      } else {
        return res.status(401).send("Email Or Password Incorrect");
      }
    } catch (err) {
      res.status(404).send("Error In Login" + err);
    }
  },
  register: async (req, res) => {
    try {
      const {
        fullName,
        username,
        gmail,
        profileImage,
        isAdmin,
        isLogin,
        wishlist,
        basket,
        password,
      } = req.body;
      let user = await UserModel.findOne({ gmail: gmail });
      if (user) {
        return res.status(404).send("User Already Registered In This Gmail");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new UserModel({
        fullName: fullName,
        username: username,
        gmail: gmail,
        profileImage: profileImage,
        isAdmin: isAdmin,
        isLogin: isLogin,
        wishlist: wishlist,
        basket: basket,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gmail: newUser.gmail,
        profileImage: newUser.profileImage,
        isAdmin: newUser.isAdmin,
        isLogin: newUser.isLogin,
        password: newUser.password,
        wishlist: newUser.wishlist,
        basket: newUser.basket,
        token: await generateToken({
          id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gmail: newUser.gmail,
          profileImage: newUser.profileImage,
          isAdmin: newUser.isAdmin,
          isLogin: newUser.isLogin,
          password: newUser.password,
          wishlist: newUser.wishlist,
          basket: newUser.basket,
        }),
      });
    } catch (err) {
      res.status(404).send("Error In Register" + err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await UserModel.findByIdAndDelete(id);
      res.send(deleteUser);
    } catch (err) {
      res.status(404).send("Error In Delete User" + err);
    }
  },
  getMe: async (req, res) => {
    res.status(200).send(req.user);
  },
  updateUserIsLogin: async (req, res) => {
    try {
      const { id } = req.params;
      const { isLogin } = req.body;
      await UserModel.findByIdAndUpdate(
        id,
        {
          $set: { isLogin: isLogin },
        },
        { new: true }
      );
      const updateUser = await UserModel.findById(id).populate("wishlist");

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error in adding to wishlist" });
    }
  },
  addToWishlist: async (req, res) => {
    try {
      const productId = req.params.productId;
      const id = req.user.id;

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      await UserModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { wishlist: productId },
        },
        { new: true }
      );
      const updateUser = await UserModel.findById(id).populate("wishlist");

      if (updateUser.wishlist.includes(productId)) {
        return res
          .status(400)
          .json({ error: "Product already in wishlist", status: 400 });
      }

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error in adding to wishlist" });
    }
  },

  removeFromWishlist: async (req, res) => {
    try {
      const productId = req.params.productId;
      const id = req.user.id;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const updateUser1 = await UserModel.findById(id);
      if (!updateUser1?.wishlist.includes(productId)) {
        return res.status(400).json({ error: "Product not found in wishlist" });
      }
      await UserModel.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: productId },
        },
        { new: true }
      );

      const updateUser = await UserModel.findById(id).populate("wishlist");

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      res.status(500).json({ error: "Error in removing from wishlist" });
    }
  },
  addToBasket: async (req, res) => {
    try {
      const productId = req.params.productId;
      const id = req.user.id;

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const updatedUser = await UserModel.findById(id);
      const filterUser = updatedUser.basket.find((i) => i.id == productId);

      if (filterUser) {
        const countProd = filterUser.count;
        const prodTotalPrice = filterUser.product.price;
        req.body.count = countProd + 1;
        req.body.totalPrice = prodTotalPrice * req.body.count;
        const indexOfTarget = updatedUser.basket.indexOf(filterUser);
        updatedUser.basket.splice(indexOfTarget, 1);
        await UserModel.findByIdAndUpdate(
          id,
          {
            $set: { basket: updatedUser.basket },
          },
          { new: true }
        );
        await UserModel.findByIdAndUpdate(
          id,
          {
            $push: { basket: req.body },
          },
          { new: true }
        );
      } else {
        await UserModel.findByIdAndUpdate(
          id,
          {
            $push: { basket: req.body },
          },
          { new: true }
        );
      }

      const updateUser = await UserModel.findById(id).populate("wishlist");

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error in adding to wishlist" });
    }
  },
  decreasedBasket: async (req, res) => {
    try {
      const productId = req.params.productId;
      const id = req.user.id;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const updatedUser = await UserModel.findById(id);
      const filterUser = updatedUser.basket.find((i) => i.id == productId);
      const countProd = filterUser.count;
      const prodTotalPrice = filterUser.product.price;
      if (filterUser) {
        req.body.count = countProd - 1;
        req.body.totalPrice = prodTotalPrice * req.body.count;
        const indexOfTarget = updatedUser.basket.indexOf(filterUser);
        updatedUser.basket.splice(indexOfTarget, 1);
        await UserModel.findByIdAndUpdate(
          id,
          {
            $set: { basket: updatedUser.basket },
          },
          { new: true }
        );
        await UserModel.findByIdAndUpdate(
          id,
          {
            $push: { basket: req.body },
          },
          { new: true }
        );
      }

      const updateUser = await UserModel.findById(id).populate("wishlist");

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error in adding to wishlist" });
    }
  },

  removeItemFromBasket: async (req, res) => {
    try {
      const productId = req.params.productId;
      const id = req.user.id;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const updateUser1 = await UserModel.findById(id);

      const filterUser = updateUser1.basket.find((i) => i.id == productId);
      if (filterUser) {
        const indexOfTarget = updateUser1.basket.indexOf(filterUser);
        updateUser1.basket.splice(indexOfTarget, 1);
        await UserModel.findByIdAndUpdate(
          id,
          {
            $set: { basket: updateUser1.basket },
          },
          { new: true }
        );
      }

      const updateUser = await UserModel.findById(id).populate("wishlist");

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error in removing from wishlist" });
    }
  },
  clearBasket: async (req, res) => {
    try {
      const { id } = req.params;
      await UserModel.findByIdAndUpdate(
        id,
        {
          $set: { basket: [] },
        },
        { new: true }
      );

      const updateUser = await UserModel.findById(id).populate("wishlist");

      const updatedToken = await generateToken({
        id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
      });

      res.status(200).send({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        username: updateUser.username,
        gmail: updateUser.gmail,
        profileImage: updateUser.profileImage,
        isAdmin: updateUser.isAdmin,
        isLogin: updateUser.isLogin,
        password: updateUser.password,
        wishlist: updateUser.wishlist,
        basket: updateUser.basket,
        token: updatedToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error in removing from wishlist" });
    }
  },
};
const generateToken = async ({
  id,
  fullName,
  username,
  gmail,
  profileImage,
  isAdmin,
  isLogin,
  password,
  wishlist,
  basket,
}) => {
  return jwt.sign(
    {
      id,
      fullName,
      username,
      gmail,
      profileImage,
      isAdmin,
      isLogin,
      password,
      wishlist,
      basket,
    },
    "meryem",
    {
      expiresIn: "110h",
    }
  );
};
module.exports = UserController;
