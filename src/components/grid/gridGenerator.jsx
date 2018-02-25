import React, { Component } from 'react';

import ItemsGrid from './itemsGrid';

export default class GridGenerator extends Component {

    GRID_QTY_ELEMENTS = 50;

    baseColors = ['lightblue', 'lightgreen', 'lightpink', 'lightyellow'];


    getRandomColor() {
        return baseColorsGradients[this.random(0, baseColorsGradients.length - 1)];
    }

    getRandomFormat(min, max) {
        return { x: this.random(min, max), y: this.random(min, max) }
    }

    getRandomPrice(min, max) {
        return this.random(min, max) + (this.random(0, 99) / 100);
    }

    getRandomIcon() {
        return iconClassName[this.random(0, iconClassName.length - 1)];
    }

    getRandomItem(id) {
        return new Item({
            id,
            color: this.getRandomColor(),
            format: this.getRandomFormat(1, 1),
            price: this.getRandomPrice(5, 35),
            icon: this.getRandomIcon(),
        });
    }

    random(min, max) {
        return min + Math.round(Math.random() * (max - min));
    }

    componentWillMount() {
        const items = [];
        for (let i = 0; i < this.GRID_QTY_ELEMENTS; i++) {
            const element = this.getRandomItem(`${i}`);
            items.push(element);
        }
        this.items = items;
        this.filterItems(this.items, this.props.filters);
    }

    componentWillUpdate(np) {
        this.filterItems(this.items, np.filters);
    }

    filterItems(items, filters) {
        if (Object.values(filters).every(filter => !filter)) {
            this.filteredItems = items;
        } else {
            this.filteredItems = items.filter(item => filters[item.color.name]);
        }
    }

    render() {
        return (
            <ItemsGrid items={this.filteredItems} />
        )
    }
}

export const baseColorsGradients = [
    { name: 'blue', in: '#aaf9ff', out: '#71abff' },
    { name: 'orange', in: '#ffcf7b', out: '#ff80ae' },
    { name: 'green', in: '#40edaf', out: '#46d4e0' },
    { name: 'pink', in: '#f5a8c5', out: '#be86f7' },
];

class Item {
    id;
    color;
    price;
    format;
    icon;

    constructor({ id, color, price, format, icon }) {
        this.id = id;
        this.color = color;
        this.price = price;
        this.format = format;
        this.icon = icon;
    }
}

const iconClassName = [
    'flaticon-001-savannah',
    'flaticon-002-igloo',
    'flaticon-003-home',
    'flaticon-004-village',
    'flaticon-005-bungalow',
    'flaticon-006-glacier',
    'flaticon-007-park',
    'flaticon-008-bridge',
    'flaticon-009-lake',
    'flaticon-010-forest',
    'flaticon-011-sunrise',
    'flaticon-012-cliff',
    'flaticon-013-fountain',
    'flaticon-014-urban',
    'flaticon-015-sea',
    'flaticon-016-iceberg',
    'flaticon-017-mountain',
    'flaticon-018-train',
    'flaticon-019-river',
    'flaticon-020-spruce',
    'flaticon-021-tipi',
    'flaticon-022-road',
    'flaticon-023-rainbow',
    'flaticon-024-nuclear-plant',
    'flaticon-025-beach',
    'flaticon-026-aurora',
    'flaticon-027-volcano',
    'flaticon-028-windmill',
    'flaticon-029-cave',
    'flaticon-030-desert',
    'flaticon-031-waterfall',
    'flaticon-032-island',
    'flaticon-033-sky',
    'flaticon-034-prairie',
    'flaticon-035-castle',
    'flaticon-036-ocean',
    'flaticon-037-canyon',
    'flaticon-038-farm',
    'flaticon-039-hills',
    'flaticon-040-dune',
];
