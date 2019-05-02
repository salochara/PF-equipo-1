from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.item import Item
from app.models.item import ItemCreate, ItemUpdate
import pymongo

client = pymongo.MongoClient('mongodb://mgcoello:Tovjip-wekqyx-xefbu3@advanceddatabases-shard-00-00-xn5qi.azure.mongodb.net:27017,advanceddatabases-shard-00-01-xn5qi.azure.mongodb.net:27017,advanceddatabases-shard-00-02-xn5qi.azure.mongodb.net:27017/test?ssl=true&replicaSet=AdvancedDatabases-shard-0&authSource=admin&retryWrites=true')
dbMongo = client.PF


def get(db_session: Session, *, id: int) -> Optional[Item]:
    return db_session.query(Item).filter(Item.id == id).first()


def get_multi(db_session: Session, *, skip=0, limit=100) -> List[Optional[Item]]:
    """return db_session.query(Item).offset(skip).limit(limit).all()"""
    listRtn = []
    tmp = dbMongo.Items.find()
    for val in tmp:
        tmpVal = Item()
        tmpVal.title = val['title']
        tmpVal.description = val['description']
        listRtn.append(tmpVal)
    return listRtn


def get_multi_by_owner(
    db_session: Session, *, owner_id: int, skip=0, limit=100
) -> List[Optional[Item]]:
    return (
        db_session.query(Item)
        .filter(Item.owner_id == owner_id)
        .offset(skip)
        .limit(limit)
        .all()
    )

def create(db_session: Session, *, item_in: ItemCreate, owner_id: int) -> Item:
    item_in_data = jsonable_encoder(item_in)
    item = Item(**item_in_data, owner_id=owner_id)
    db_session.add(item)
    db_session.commit()
    db_session.refresh(item)
    return item


def update(db_session: Session, *, item: Item, item_in: ItemUpdate) -> Item:
    item_data = jsonable_encoder(item)
    update_data = item_in.dict(skip_defaults=True)
    for field in item_data:
        if field in update_data:
            setattr(item, field, update_data[field])
    db_session.add(item)
    db_session.commit()
    db_session.refresh(item)
    return item


def remove(db_session: Session, *, id: int):
    item = db_session.query(Item).filter(Item.id == id).first()
    db_session.delete(item)
    db_session.commit()
    return item
