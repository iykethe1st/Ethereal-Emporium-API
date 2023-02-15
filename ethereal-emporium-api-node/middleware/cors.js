export default function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://example.com");
  next();
}
