#!/usr/bin/env python3

"""This module implements the MRU caching algorithm."""

from typing import Union, Any
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Implement an MRU caching algorithm."""

    def __init__(self) -> None:
        """Initialize the instance."""
        super().__init__()
        self.keys = []

    def put(self, key: Any, item: Any) -> None:
        """Insert an item into the cache."""
        if any(obj is None for obj in (key, item)):
            return

        if key in self.cache_data:
            self.keys.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last = self.keys.pop()
            del self.cache_data[last]
            print(f"DISCARD: {last}")

        self.keys.append(key)
        self.cache_data[key] = item

    def get(self, key: Any) -> Union[Any, None]:
        """Return the item with the given key if it exists, else None."""
        if key in self.cache_data:
            self.keys.remove(key)
            self.keys.append(key)
            return self.cache_data[key]
        return None
