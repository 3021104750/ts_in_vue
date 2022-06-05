module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "eqeqeq": 1,//必须使用全等
    "camelcase": 0,//强制驼峰法命名
    "prefer-const": [0, { 'ignoreReadBeforeAssign': false }],// 禁止必须使用 const
    "semi": [2, "always"], // 语句强制分号结尾
    "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
    "space-before-function-paren": [0, "always"], // 函数定义时括号前面要不要有空格 
    "@typescript-eslint/no-explicit-any": "off", // 关闭any报错
    "@typescript-eslint/no-empty-function": "off", // 关闭不能空的function
    "@typescript-eslint/no-empty-interface": "off", // 关闭不能空接口
    // "no-inferrable-types": 0, // 防止eslint会对声明但未使用的变量做检查从而报错
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
