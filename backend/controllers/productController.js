const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, photo } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      photo,
      owner: req.user.id
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création produit' });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération produits' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;
    let filters = {};

    if (keyword) filters.name = { $regex: keyword, $options: 'i' };
    if (category) filters.category = category;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(filters).populate('owner', 'username');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération produits' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('owner', 'username');
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, owner: req.user.id });
    if (!product) return res.status(403).json({ message: 'Accès refusé' });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur mise à jour produit' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!product) return res.status(403).json({ message: 'Accès refusé ou produit introuvable' });

    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur suppression produit' });
  }
};