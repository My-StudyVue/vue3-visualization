import express, { Express, Router, Request, Response } from 'express';
import axios from 'axios';

const app: Express = express();

// 配置路由
const router: Router = express.Router({
  // 在router 里面用到了 app.use 里面的动态参数，则需要加 mergeParams
  mergeParams: true, //表示合并 url参数
})

// 跨域
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  next();
})

app.use('/api', router)

// json 格式接收
// app.use(express.json())

router.get('/list', async (req: Request, res: Response) => {
  // req 接收前端传过来的东西
  const result = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
  // res 发送给前端
  res.json({
    data: result.data,
  })
})

app.listen('3333', () => {
  console.log('success server http://localhost:3333');
})
