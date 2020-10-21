const ctxRedirect = (ctx, path) => {
  ctx.res.writeHead(301, {
    Location: path,
  });
  ctx.res.end();
};

export default ctxRedirect;
