from neo4j.v1 import GraphDatabase, basic_auth



driver = GraphDatabase.driver("bolt://leuschke-road-elise-white.graphstory.services:7687", auth=basic_auth("leuschke_road_elise_white", "4h4n6QTuasVsx4lX8jhOFe"))
session = driver.session()
session.run("CREATE (a:Person {name:'Bob'})")
result = session.run("MATCH (a:Person) RETURN a.name AS name")
for record in result:
    print(record["name"])
result.close()
session.close()