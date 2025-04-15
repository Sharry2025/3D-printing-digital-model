// api/streamlit.js
const { exec } = require("child_process");
const fs = require("fs");

export default async (req, res) => {
  // 启动 Streamlit 服务（端口由 Vercel 自动分配）
  const streamlit = exec(
    "streamlit run app.py --server.port=$PORT --server.address=0.0.0.0",
    { stdio: "inherit" }
  );

  // 将 Streamlit 的输出流传递给客户端
  streamlit.stdout.pipe(res);
  streamlit.stderr.pipe(res);

  // 防止函数退出
  await new Promise(() => {});
};