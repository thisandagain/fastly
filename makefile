JSHINT = ./node_modules/.bin/jshint
TAP = ./node_modules/.bin/tap

lint:
	$(JSHINT) ./lib/*.js

unit:
	$(TAP) ./test/unit/*.js

test:
	@make lint
	@make unit

.PHONY: lint unit test