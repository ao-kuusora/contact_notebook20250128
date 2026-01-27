"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/register/route";
exports.ids = ["app/api/auth/register/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_aokuu_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/register/route.ts */ \"(rsc)/./app/api/auth/register/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/register/route\",\n        pathname: \"/api/auth/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/register/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\aokuu\\\\同棲交換日記\\\\app\\\\api\\\\auth\\\\register\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_aokuu_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/register/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcmVnaXN0ZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhb2t1dSU1QyVFNSU5MCU4QyVFNiVBMyVCMiVFNCVCQSVBNCVFNiU4RiU5QiVFNiU5NyVBNSVFOCVBOCU5OCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYW9rdXUlNUMlRTUlOTAlOEMlRTYlQTMlQjIlRTQlQkElQTQlRTYlOEYlOUIlRTYlOTclQTUlRTglQTglOTgmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ1k7QUFDekY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vPzRkOWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYW9rdXVcXFxc5ZCM5qOy5Lqk5o+b5pel6KiYXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxyZWdpc3RlclxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvcmVnaXN0ZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhb2t1dVxcXFzlkIzmo7LkuqTmj5vml6XoqJhcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHJlZ2lzdGVyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/register/route.ts":
/*!****************************************!*\
  !*** ./app/api/auth/register/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nasync function POST(req) {\n    try {\n        const { email, password, displayName } = await req.json();\n        // すでに登録済みかチェック\n        const exists = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (exists) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"このメールアドレスは既に登録されています\"\n            }, {\n                status: 400\n            });\n        }\n        // パスワードをハッシュ化\n        const passwordHash = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hash(password, 10);\n        // ユーザー作成\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.create({\n            data: {\n                email,\n                passwordHash,\n                displayName\n            }\n        });\n        // JWT 発行\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            userId: user.id\n        }, process.env.JWT_SECRET, {\n            expiresIn: \"7d\"\n        });\n        // Cookie にセット\n        const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: true\n        });\n        res.cookies.set(\"session\", token, {\n            httpOnly: true,\n            secure: \"development\" == \"production\",\n            path: \"/\",\n            maxAge: 60 * 60 * 24 * 7\n        });\n        return res;\n    } catch (e) {\n        console.error(e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"登録処理中にエラーが発生しました\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJDO0FBQ0w7QUFDUjtBQUNDO0FBRXhCLGVBQWVJLEtBQUtDLEdBQVk7SUFDckMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLFdBQVcsRUFBRSxHQUFHLE1BQU1ILElBQUlJLElBQUk7UUFFdkQsZUFBZTtRQUNmLE1BQU1DLFNBQVMsTUFBTVQsK0NBQU1BLENBQUNVLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQUVDLE9BQU87Z0JBQUVQO1lBQU07UUFBRTtRQUMvRCxJQUFJSSxRQUFRO1lBQ1YsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVLLE9BQU87WUFBdUIsR0FDaEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLGNBQWM7UUFDZCxNQUFNQyxlQUFlLE1BQU1kLHFEQUFXLENBQUNLLFVBQVU7UUFFakQsU0FBUztRQUNULE1BQU1JLE9BQU8sTUFBTVYsK0NBQU1BLENBQUNVLElBQUksQ0FBQ08sTUFBTSxDQUFDO1lBQ3BDQyxNQUFNO2dCQUNKYjtnQkFDQVU7Z0JBQ0FSO1lBQ0Y7UUFDRjtRQUVBLFNBQVM7UUFDVCxNQUFNWSxRQUFRakIsd0RBQVEsQ0FBQztZQUFFbUIsUUFBUVgsS0FBS1ksRUFBRTtRQUFDLEdBQUdDLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVSxFQUFHO1lBQ25FQyxXQUFXO1FBQ2I7UUFFQSxjQUFjO1FBQ2QsTUFBTUMsTUFBTTVCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRW9CLElBQUk7UUFBSztRQUV6Q0QsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsV0FBV1gsT0FBTztZQUNoQ1ksVUFBVTtZQUNWQyxRQUFRVCxpQkFBd0I7WUFDaENVLE1BQU07WUFDTkMsUUFBUSxLQUFLLEtBQUssS0FBSztRQUN6QjtRQUVBLE9BQU9QO0lBQ1QsRUFBRSxPQUFPUSxHQUFHO1FBQ1ZDLFFBQVF2QixLQUFLLENBQUNzQjtRQUNkLE9BQU9wQyxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtZQUFFSyxPQUFPO1FBQW1CLEdBQzVCO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlLnRzPzRhOGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGRpc3BsYXlOYW1lIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG5cclxuICAgIC8vIOOBmeOBp+OBq+eZu+mMsua4iOOBv+OBi+ODgeOCp+ODg+OCr1xyXG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSk7XHJcbiAgICBpZiAoZXhpc3RzKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIuOBk+OBruODoeODvOODq+OCouODieODrOOCueOBr+aXouOBq+eZu+mMsuOBleOCjOOBpuOBhOOBvuOBmVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g44OR44K544Ov44O844OJ44KS44OP44OD44K344Ol5YyWXHJcbiAgICBjb25zdCBwYXNzd29yZEhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xyXG5cclxuICAgIC8vIOODpuODvOOCtuODvOS9nOaIkFxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBlbWFpbCxcclxuICAgICAgICBwYXNzd29yZEhhc2gsXHJcbiAgICAgICAgZGlzcGxheU5hbWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBKV1Qg55m66KGMXHJcbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHsgdXNlcklkOiB1c2VyLmlkIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhLCB7XHJcbiAgICAgIGV4cGlyZXNJbjogXCI3ZFwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29va2llIOOBq+OCu+ODg+ODiFxyXG4gICAgY29uc3QgcmVzID0gTmV4dFJlc3BvbnNlLmpzb24oeyBvazogdHJ1ZSB9KTtcclxuXHJcbiAgICByZXMuY29va2llcy5zZXQoXCJzZXNzaW9uXCIsIHRva2VuLCB7XHJcbiAgICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09IFwicHJvZHVjdGlvblwiLFxyXG4gICAgICBwYXRoOiBcIi9cIixcclxuICAgICAgbWF4QWdlOiA2MCAqIDYwICogMjQgKiA3LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBcIueZu+mMsuWHpueQhuS4reOBq+OCqOODqeODvOOBjOeZuueUn+OBl+OBvuOBl+OBn1wiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiYmNyeXB0Iiwiand0IiwiUE9TVCIsInJlcSIsImVtYWlsIiwicGFzc3dvcmQiLCJkaXNwbGF5TmFtZSIsImpzb24iLCJleGlzdHMiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiZXJyb3IiLCJzdGF0dXMiLCJwYXNzd29yZEhhc2giLCJoYXNoIiwiY3JlYXRlIiwiZGF0YSIsInRva2VuIiwic2lnbiIsInVzZXJJZCIsImlkIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJleHBpcmVzSW4iLCJyZXMiLCJvayIsImNvb2tpZXMiLCJzZXQiLCJodHRwT25seSIsInNlY3VyZSIsInBhdGgiLCJtYXhBZ2UiLCJlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/register/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFHO0FBRUwsSUFBSUMsSUFBb0MsRUFBRTtJQUN4Q0osZ0JBQWdCRSxNQUFNLEdBQUdBO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcclxuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz9cclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIl0sXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG59Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();