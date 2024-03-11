import JWT from "jsonwebtoken";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAuthor = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'author') {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'admin') {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
// Editor access
export const isEditor = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'editor') {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in editor middleware",
    });
  }
};

// Reviewer access
export const isReviewer = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'reviewer') {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in reviewer middleware",
    });
  }
};

// Quality access
export const isQuality = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'quality') {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in quality middleware",
    });
  }
};

// Formatting access
export const isFormatting = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 'formatting') {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in formatting middleware",
    });
  }
};

