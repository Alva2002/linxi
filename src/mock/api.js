import users from './users.json';
import articles from './article.json';
import Mock from 'mockjs'

const Random = Mock.Random
    // 生成随机的用户ID
const generateUserId = () => {
        return Random.integer(100000, 999999)
    }
    // 模拟登录接口
export function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // 如果找到了匹配的用户，则返回用户信息
        const result = {
            code: 200,
            message: '登录成功',
            data: user
        }
        return Promise.resolve(result);
    } else {
        // 如果没有找到匹配的用户，则返回错误信息
        const err = {
            code: 0,
            message: '该用户不存在，请注册！',
        }
        return Promise.resolve(err);
    }
}

//模拟注册接口
Mock.mock('/api/register', 'post', (options) => {
    const { username, password, nickname } = JSON.parse(options.body)

    // 检查用户名是否已存在
    const user = users.find((u) => u.username === username)
    if (user) {
        return {
            code: 0,
            message: '该用户名已被注册',
        }
    }

    // 生成新用户的ID
    const id = generateUserId()

    // 将新用户添加到用户列表
    const newUser = {
        id,
        username,
        password,
        nickname,
    }

    users.push(newUser)

    return {
        code: 200,
        message: '注册成功',
        data: users
    }
})

//文章列表
Mock.mock('/api/article', 'get', () => {
    return {
        code: 200,
        data: articles
    }
})

//获取对应文章
Mock.mock(/\/api\/article\/\d+/, 'get', ({ url }) => {
    const id = url.match(/\/api\/article\/(\d+)/)[1];
    const article = articles.find(article => article.id == id)
    if (article) {
        return {
            code: 200,
            data: article
        }
    } else {
        return {
            code: 0,
            message: '文章不存在'
        }
    }
})