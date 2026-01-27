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
exports.id = "app/api/couple/create/route";
exports.ids = ["app/api/couple/create/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcouple%2Fcreate%2Froute&page=%2Fapi%2Fcouple%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcouple%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcouple%2Fcreate%2Froute&page=%2Fapi%2Fcouple%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcouple%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_aokuu_app_api_couple_create_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/couple/create/route.ts */ \"(rsc)/./app/api/couple/create/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/couple/create/route\",\n        pathname: \"/api/couple/create\",\n        filename: \"route\",\n        bundlePath: \"app/api/couple/create/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\aokuu\\\\同棲交換日記\\\\app\\\\api\\\\couple\\\\create\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_aokuu_app_api_couple_create_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/couple/create/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjb3VwbGUlMkZjcmVhdGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNvdXBsZSUyRmNyZWF0ZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNvdXBsZSUyRmNyZWF0ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhb2t1dSU1QyVFNSU5MCU4QyVFNiVBMyVCMiVFNCVCQSVBNCVFNiU4RiU5QiVFNiU5NyVBNSVFOCVBOCU5OCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYW9rdXUlNUMlRTUlOTAlOEMlRTYlQTMlQjIlRTQlQkElQTQlRTYlOEYlOUIlRTYlOTclQTUlRTglQTglOTgmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ1k7QUFDekY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vP2MzMWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYW9rdXVcXFxc5ZCM5qOy5Lqk5o+b5pel6KiYXFxcXGFwcFxcXFxhcGlcXFxcY291cGxlXFxcXGNyZWF0ZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY291cGxlL2NyZWF0ZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NvdXBsZS9jcmVhdGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NvdXBsZS9jcmVhdGUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhb2t1dVxcXFzlkIzmo7LkuqTmj5vml6XoqJhcXFxcYXBwXFxcXGFwaVxcXFxjb3VwbGVcXFxcY3JlYXRlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jb3VwbGUvY3JlYXRlL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcouple%2Fcreate%2Froute&page=%2Fapi%2Fcouple%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcouple%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/couple/create/route.ts":
/*!****************************************!*\
  !*** ./app/api/couple/create/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction generateInviteCode() {\n    return Math.random().toString(36).substring(2, 10).toUpperCase();\n}\nasync function POST(req) {\n    try {\n        const token = req.headers.get(\"cookie\")?.split(\"session=\")[1];\n        if (!token) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"未ログイン\"\n        }, {\n            status: 401\n        });\n        const payload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n        let inviteCode = generateInviteCode();\n        // ★ 衝突チェック\n        while(await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.couple.findUnique({\n            where: {\n                inviteCode\n            }\n        })){\n            inviteCode = generateInviteCode();\n        }\n        const couple = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.couple.create({\n            data: {\n                inviteCode,\n                users: {\n                    connect: {\n                        id: payload.userId\n                    }\n                }\n            }\n        });\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.update({\n            where: {\n                id: payload.userId\n            },\n            data: {\n                coupleId: couple.id\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            inviteCode\n        });\n    } catch (e) {\n        console.error(e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"世界の作成に失敗しました\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvdXBsZS9jcmVhdGUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDTDtBQUNQO0FBRS9CLFNBQVNHO0lBQ1AsT0FBT0MsS0FBS0MsTUFBTSxHQUFHQyxRQUFRLENBQUMsSUFBSUMsU0FBUyxDQUFDLEdBQUcsSUFBSUMsV0FBVztBQUNoRTtBQUVPLGVBQWVDLEtBQUtDLEdBQVk7SUFDckMsSUFBSTtRQUNGLE1BQU1DLFFBQVFELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFdBQVdDLE1BQU0sV0FBVyxDQUFDLEVBQUU7UUFDN0QsSUFBSSxDQUFDSCxPQUFPLE9BQU9YLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFRLEdBQUc7WUFBRUMsUUFBUTtRQUFJO1FBRXZFLE1BQU1DLFVBQVVoQiwwREFBVSxDQUFDUyxPQUFPUyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFFeEQsSUFBSUMsYUFBYXBCO1FBRWpCLFdBQVc7UUFDWCxNQUFPLE1BQU1GLCtDQUFNQSxDQUFDdUIsTUFBTSxDQUFDQyxVQUFVLENBQUM7WUFBRUMsT0FBTztnQkFBRUg7WUFBVztRQUFFLEdBQUk7WUFDaEVBLGFBQWFwQjtRQUNmO1FBRUEsTUFBTXFCLFNBQVMsTUFBTXZCLCtDQUFNQSxDQUFDdUIsTUFBTSxDQUFDRyxNQUFNLENBQUM7WUFDeENDLE1BQU07Z0JBQ0pMO2dCQUNBTSxPQUFPO29CQUFFQyxTQUFTO3dCQUFFQyxJQUFJYixRQUFRYyxNQUFNO29CQUFDO2dCQUFFO1lBQzNDO1FBQ0Y7UUFFQSxNQUFNL0IsK0NBQU1BLENBQUNnQyxJQUFJLENBQUNDLE1BQU0sQ0FBQztZQUN2QlIsT0FBTztnQkFBRUssSUFBSWIsUUFBUWMsTUFBTTtZQUFDO1lBQzVCSixNQUFNO2dCQUFFTyxVQUFVWCxPQUFPTyxFQUFFO1lBQUM7UUFDOUI7UUFFQSxPQUFPL0IscURBQVlBLENBQUNlLElBQUksQ0FBQztZQUFFUTtRQUFXO0lBRXhDLEVBQUUsT0FBT2EsR0FBRztRQUNWQyxRQUFRckIsS0FBSyxDQUFDb0I7UUFDZCxPQUFPcEMscURBQVlBLENBQUNlLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9hcGkvY291cGxlL2NyZWF0ZS9yb3V0ZS50cz9kZGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVJbnZpdGVDb2RlKCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTApLnRvVXBwZXJDYXNlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXJzLmdldChcImNvb2tpZVwiKT8uc3BsaXQoXCJzZXNzaW9uPVwiKVsxXTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIuacquODreOCsOOCpOODs1wiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcblxyXG4gICAgY29uc3QgcGF5bG9hZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhKSBhcyB7IHVzZXJJZDogc3RyaW5nIH07XHJcblxyXG4gICAgbGV0IGludml0ZUNvZGUgPSBnZW5lcmF0ZUludml0ZUNvZGUoKTtcclxuXHJcbiAgICAvLyDimIUg6KGd56qB44OB44Kn44OD44KvXHJcbiAgICB3aGlsZSAoYXdhaXQgcHJpc21hLmNvdXBsZS5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaW52aXRlQ29kZSB9IH0pKSB7XHJcbiAgICAgIGludml0ZUNvZGUgPSBnZW5lcmF0ZUludml0ZUNvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3VwbGUgPSBhd2FpdCBwcmlzbWEuY291cGxlLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBpbnZpdGVDb2RlLFxyXG4gICAgICAgIHVzZXJzOiB7IGNvbm5lY3Q6IHsgaWQ6IHBheWxvYWQudXNlcklkIH0gfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBwYXlsb2FkLnVzZXJJZCB9LFxyXG4gICAgICBkYXRhOiB7IGNvdXBsZUlkOiBjb3VwbGUuaWQgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGludml0ZUNvZGUgfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLkuJbnlYzjga7kvZzmiJDjgavlpLHmlZfjgZfjgb7jgZfjgZ9cIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJnZW5lcmF0ZUludml0ZUNvZGUiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsIlBPU1QiLCJyZXEiLCJ0b2tlbiIsImhlYWRlcnMiLCJnZXQiLCJzcGxpdCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInBheWxvYWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImludml0ZUNvZGUiLCJjb3VwbGUiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJjcmVhdGUiLCJkYXRhIiwidXNlcnMiLCJjb25uZWN0IiwiaWQiLCJ1c2VySWQiLCJ1c2VyIiwidXBkYXRlIiwiY291cGxlSWQiLCJlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/couple/create/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcouple%2Fcreate%2Froute&page=%2Fapi%2Fcouple%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcouple%2Fcreate%2Froute.ts&appDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Caokuu%5C%E5%90%8C%E6%A3%B2%E4%BA%A4%E6%8F%9B%E6%97%A5%E8%A8%98&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();