from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.service import Service
import pymongo

client = pymongo.MongoClient('mongodb://mgcoello:Tovjip-wekqyx-xefbu3@advanceddatabases-shard-00-00-xn5qi.azure.mongodb.net:27017,advanceddatabases-shard-00-01-xn5qi.azure.mongodb.net:27017,advanceddatabases-shard-00-02-xn5qi.azure.mongodb.net:27017/test?ssl=true&replicaSet=AdvancedDatabases-shard-0&authSource=admin&retryWrites=true')
dbMongo = client.PF


def get() -> List[Optional[Service]]:
    """return db_session.query(Item).offset(skip).limit(limit).all()"""
    listRtn = []
    tmp = dbMongo.Items.find()
    for val in tmp:
        tmpVal = Service()
        tmpVal.title = val['title']
        tmpVal.description = val['description']
        listRtn.append(tmpVal)
    return listRtn