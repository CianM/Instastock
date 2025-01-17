module.exports = {
	root: true,

	env: {
		node: true
	},

	parserOptions: {
		parser: "@typescript-eslint/parser"
	},

	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["warn"]
	},

	extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier", "@vue/typescript"]
};
