.PHONY : clean
clean :
	$(RM) db.json
	$(RM) -r node_modules

db.json : scripts/make-db ; @$<

scripts/make-db : node_modules

node_modules : ; npm install
