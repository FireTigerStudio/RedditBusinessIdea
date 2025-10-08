# 📋 GitHub & Cloudflare Pages 部署指南

## 🔗 第一步：创建GitHub仓库

1. 访问 [https://github.com/FireTigerStudio?tab=repositories](https://github.com/FireTigerStudio?tab=repositories)
2. 点击 **"New"** 按钮创建新仓库
3. 填写仓库信息：
   - **Repository name**: `RedditBusinessIdea`
   - **Description**: `AI-powered business opportunity discovery from Reddit discussions`
   - **Visibility**: Public (推荐，便于展示)
   - **不要**勾选 "Add a README file"（我们已经有了）
4. 点击 **"Create repository"**

## 🚀 第二步：推送代码到GitHub

复制以下命令并在终端中执行：

```bash
# 添加GitHub远程仓库（替换为你的实际仓库URL）
git remote add origin https://github.com/FireTigerStudio/RedditBusinessIdea.git

# 推送代码到GitHub
git push -u origin main
```

## ☁️ 第三步：部署到Cloudflare Pages

### 3.1 连接GitHub仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单选择 **"Pages"**
3. 点击 **"Create a project"**
4. 选择 **"Connect to Git"**
5. 选择 **GitHub** 并授权访问
6. 选择 **"RedditBusinessIdea"** 仓库
7. 点击 **"Begin setup"**

### 3.2 配置构建设置

填写以下构建配置：

- **Project name**: `redditbusinessidea`
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (留空)

### 3.3 设置环境变量

在 **"Environment variables"** 部分添加：

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_REDDIT_CLIENT_ID` | 你的Reddit客户端ID |
| `REDDIT_CLIENT_SECRET` | 你的Reddit客户端密钥 |
| `NODE_VERSION` | `18` |

### 3.4 部署

1. 点击 **"Save and Deploy"**
2. 等待构建完成（通常2-5分钟）
3. 构建成功后，你会得到一个临时URL，如：`https://redditbusinessidea.pages.dev`

## 🌐 第四步：配置自定义域名

### 4.1 添加自定义域名

1. 在Cloudflare Pages项目中，点击 **"Custom domains"** 标签
2. 点击 **"Set up a custom domain"**
3. 输入域名：`redditbusinessidea.firetigerstudio.com`
4. 点击 **"Continue"**

### 4.2 配置DNS记录

Cloudflare会自动为你配置DNS记录，因为你的域名已经在Cloudflare上。

### 4.3 等待SSL证书

- SSL证书会自动配置
- 通常需要几分钟到几小时
- 完成后你的应用将在 `https://redditbusinessidea.firetigerstudio.com` 可用

## ✅ 验证部署

部署完成后，访问你的域名并测试：

1. **页面加载** - 确保应用正常显示
2. **搜索功能** - 输入Mistral API密钥并测试搜索
3. **响应式设计** - 在手机和桌面上测试
4. **错误处理** - 测试各种错误情况

## 🔧 故障排除

如果遇到问题：

1. **构建失败** - 检查环境变量是否正确设置
2. **Reddit API错误** - 验证Reddit API凭据
3. **域名问题** - 检查DNS传播状态
4. **SSL问题** - 等待证书自动配置完成

## 🎉 完成！

你的RedditBusinessIdea应用现在已经：
- ✅ 部署到GitHub
- ✅ 托管在Cloudflare Pages
- ✅ 使用自定义域名
- ✅ 配置了SSL证书
- ✅ 全球CDN加速

**应用地址**: https://redditbusinessidea.firetigerstudio.com
