/* eslint-disable */
export default async () => {
    const t = {
        ["./users/models/user.model"]: await import("./users/models/user.model")
    };
    return { "@nestjs/swagger/plugin": { "models": [], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "getHelloName": { type: String } } }]] }, "@nestjs/graphql/plugin": { "models": [[import("./auth/dto/signup.input"), { "SignupInput": { email: {}, password: {}, firstname: { nullable: true }, lastname: { nullable: true } } }], [import("./auth/models/token.model"), { "Token": { accessToken: {}, refreshToken: {} } }], [import("./common/models/base.model"), { "BaseModel": { id: {}, createdAt: {}, updatedAt: {} } }], [import("./posts/models/post.model"), { "Post": { title: {}, content: { nullable: true }, published: {}, author: { nullable: true } } }], [import("./users/models/user.model"), { "User": { email: {}, firstname: { nullable: true }, lastname: { nullable: true }, role: {}, posts: { nullable: true } } }], [import("./auth/models/auth.model"), { "Auth": { user: { type: () => t["./users/models/user.model"].User } } }], [import("./auth/dto/login.input"), { "LoginInput": { email: {}, password: {} } }], [import("./auth/dto/refresh-token.input"), { "RefreshTokenInput": { token: {} } }], [import("./users/dto/change-password.input"), { "ChangePasswordInput": { oldPassword: {}, newPassword: {} } }], [import("./users/dto/update-user.input"), { "UpdateUserInput": { firstname: { nullable: true }, lastname: { nullable: true } } }], [import("./common/pagination/pagination.args"), { "PaginationArgs": { skip: { nullable: true, type: () => Number }, after: { nullable: true, type: () => String }, before: { nullable: true, type: () => String }, first: { nullable: true, type: () => Number }, last: { nullable: true, type: () => Number } } }], [import("./posts/args/post-id.args"), { "PostIdArgs": { postId: { type: () => String } } }], [import("./posts/args/user-id.args"), { "UserIdArgs": { userId: { type: () => String } } }], [import("./common/pagination/page-info.model"), { "PageInfo": { endCursor: { nullable: true }, hasNextPage: {}, hasPreviousPage: {}, startCursor: { nullable: true } } }], [import("./posts/models/post-connection.model"), { "PostConnection": {} }], [import("./posts/dto/post-order.input"), { "PostOrder": { field: {} } }], [import("./posts/dto/createPost.input"), { "CreatePostInput": { content: {}, title: {} } }], [import("./folders/args/folder-id.args"), { "FolderIdArgs": { folderId: { type: () => String } } }], [import("./folders/args/user-id.args"), { "UserIdArgs": { userId: { type: () => String } } }], [import("./folders/models/folder.model"), { "Folder": { title: {}, description: { nullable: true }, author: { nullable: true } } }], [import("./folders/models/folder-connection.model"), { "FolderConnection": {} }], [import("./folders/dto/folder-order.input"), { "FolderOrder": { field: {} } }], [import("./folders/dto/createFolder.input"), { "CreateFolderInput": { title: {}, description: {} } }], [import("./wsets/args/wset-id.args"), { "WsetIdArgs": { wsetId: { type: () => String } } }], [import("./wsets/args/user-id.args"), { "UserIdArgs": { userId: { type: () => String } } }], [import("./wsets/models/wset.model"), { "Wset": { title: {}, description: { nullable: true }, author: { nullable: true }, folder: { nullable: true } } }], [import("./wsets/models/wset-connection.model"), { "WsetConnection": {} }], [import("./wsets/dto/wset-order.input"), { "WsetOrder": { field: {} } }], [import("./wsets/dto/createWset.input"), { "CreateWsetInput": { title: {}, folderId: {}, description: {} } }], [import("./words/args/word-id.args"), { "WordIdArgs": { wordId: { type: () => String } } }], [import("./words/args/user-id.args"), { "UserIdArgs": { userId: { type: () => String } } }], [import("./words/models/word.model"), { "Word": { title: {}, titleLang: { nullable: true }, description: { nullable: true }, descLang: { nullable: true }, img: { nullable: true }, audio: { nullable: true }, wset: { nullable: true } } }], [import("./words/models/word-connection.model"), { "WordConnection": {} }], [import("./words/dto/word-order.input"), { "WordOrder": { field: {} } }], [import("./words/dto/createWord.input"), { "CreateWordInput": { title: {}, titleLang: {}, description: {}, descLang: {}, img: {}, audio: {}, setId: {} } }], [import("./xwords/args/xword-id.args"), { "XwordIdArgs": { xwordId: { type: () => String } } }], [import("./xwords/args/user-id.args"), { "UserIdArgs": { userId: { type: () => String } } }], [import("./xwords/models/xword.model"), { "Xword": { title: {}, titleLang: { nullable: true }, description: { nullable: true }, descLang: { nullable: true }, img: { nullable: true }, audio: { nullable: true } } }], [import("./xwords/models/xword-connection.model"), { "XwordConnection": {} }], [import("./xwords/dto/xword-order.input"), { "XwordOrder": { field: {} } }], [import("./xwords/dto/createXword.input"), { "CreateXwordInput": { title: {}, titleLang: {}, description: {}, descLang: {}, img: {}, audio: {} } }]] } };
};