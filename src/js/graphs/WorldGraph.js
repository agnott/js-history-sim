const Random = require('../lib/Random');
const _ = require('underscore');
const SVG = require('svg.js');

console.log(Random.random());

class WorldGraph {
  constructor(width, height) {
    this.width = width || 800;
    this.height = height || 400;

    this.nV = 0;
    this.graph = {};
  }

  addVertex(count = 1) {
    while (count-- > 0) {
      this.graph[this.nV] = {
        x: Random.uniform(10, this.width - 10),
        y: Random.uniform(10, this.height - 10),
        edges: []
      }
      this.nV++;
    }
  }

  addEdge(v1, v2) {
    const dist = this.dist(v1, v2);

    this.graph[v1].edges.push({
      v: v2,
      weight: dist
    });

    this.graph[v2].edges.push({
      v: v1,
      weight: dist
    });
  }

  connected(source, fn) {
    const visited = new Set();
    const queue = [source];
    let curr = null;

    while (queue.length > 0) {
      curr = queue.pop();

      if (visited.has(curr)) continue;

      fn(curr);
      visited.add(curr);

      for (let e of this.graph[curr].edges) {
        if (!visited.has(e.v)) {
          queue.push(e.v);
        }
      }
    }

    return false;
  }

  dfs(source, search) {
    const visited = new Set();
    const queue = [source];
    let curr = null;

    while (queue.length > 0) {
      curr = queue.pop();

      if (curr === search) return true;
      if (visited.has(curr)) continue;

      visited.add(curr);

      for (let {v, weight} of this.graph[curr].edges) {
        if (!visited.has(v)) {
          queue.push(v);
        }
      }
    }

    return false;
  }

  edgeExists(v1, v2) {
    for (let e of this.graph[v1].edges) {
      if (e.v === v2) return true;
    }
    return false;
  }

  connect() {
    const graph = this.graph;
    let sorted = null;
    let nConnect = null;

    for (let v1 in graph) {
      sorted = [];

      for (let v2 in graph) {
        if (v1 === v2) continue;

        sorted.push({v: v2, d: this.dist(v1, v2)});
      }

      sorted.sort((a, b) => {
        return a.d - b.d;
      });

      nConnect = Random.integer(0, 2);

      for (let s of sorted) {
        if (!nConnect) break;
        if (this.edgeExists(v1, s.v)) continue;

        this.addEdge(v1, s.v);
        nConnect--;
      }
    }

    // Connect unconnected compoents
    while(true) {
      sorted = [];
      for (let v1 in graph) {
        for (let v2 in graph) {
          if (v1 === v2) continue;
          if (this.dfs(v1, v2)) continue;

          sorted.push({v1: v1, v2: v2, dist: this.dist(v1, v2)});
        }
      }

      if (sorted.length === 0) break;

      sorted.sort((a, b) => {
        return a.dist - b.dist;
      });

      for (let s of sorted) {
        if (this.edgeExists(s.v1, s.v2)) continue;
        this.addEdge(s.v1, s.v2);
        break;
      }
    }

  }

  dist(v1, v2) {
    v1 = this.graph[v1];
    v2 = this.graph[v2];

    return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
  }

  draw(selector) {
    const graph = this.graph;
    const draw = SVG(selector).size(this.width, this.height);

    const circles = {};
    const lines = new Set();

    for (let v in graph) {
      circles[v] = draw.circle(5)
                       .cx(graph[v].x)
                       .cy(graph[v].y)
                       .attr({fill: 'green'})
                       .data('vertex', v);

      draw.circle(100).cx(graph[v].x).cy(graph[v].y)
        .attr({
          fill: 'rgba(25, 240, 50, 0.3)'
        }).back();
    }

    for (let v in graph) {
      for (let e of graph[v].edges) {
        if (lines.has(`${e.v}-${v}`)) continue;

        lines.add(`${v}-${e.v}`);
        draw.line(
          graph[v].x,
          graph[v].y,
          graph[e.v].x,
          graph[e.v].y
        ).stroke({
          width: 1,
          color: 'black'
        }).back();
      }
    }

  }
}

module.exports = WorldGraph;
