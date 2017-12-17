import _ from 'lodash';
import jKstra from 'jkstra';
import { getStore } from 'src/js/store';
import * as appSelectors from 'src/js/components/app/selectors';

class Deals {
	constructor() {

		this.deals = {
			graph: new jKstra.Graph(),
			vertices: [],
			edges: {},
		};

		this.dijkstra = null;
		this.allLocations = [];

		// graph only needs to be created once
		this.createGraph = _.once(this.createGraph.bind(this));
	}

	getCost({ cost, discount }) {
		return cost - (discount/100 * cost)
	}

	getDuration({ duration: { h, m }}) {
		return (Number(h) * 60) + Number(m);
	}

	getFromToVertices(from, to) {
		const departureIndex = _.indexOf(this.allLocations, from);
		const arrivalIndex = _.indexOf(this.allLocations, to);

		const fromVertex = this.deals.vertices[departureIndex];
		const toVertex = this.deals.vertices[arrivalIndex];

		return [fromVertex, toVertex];
	}

	createGraph(state = getStore().getState()){

		const { graph, vertices } = this.deals;

		const allDeals = appSelectors.getDeals(state);
		const fromToOptions = appSelectors.getDepartueArrivalOptions(state);
		const additionalLocations = _.difference(fromToOptions.to, fromToOptions.from);

		// find all possible nodes
		this.allLocations.push(..._.concat(fromToOptions.from, additionalLocations));

		// add nodes to graph
		_.forEach(this.allLocations, (location) => {
			vertices.push(
				graph.addVertex(location)
			);
		});

		// adding unidirectional edges between nodes

		// Calculate and provide weight of edges
		// 1. Fastest: Select the best duration in minutes comparing time taken between train, bus and car
		// 2. Cheapest: Select the best cost by calculating discount and comparing rates between train, bus and car
		_.reduce(allDeals, (edges, deal) => {

			const {
				departure: from,
				arrival: to,
				discount,
				reference,
				transport,
			} = deal;
			const duration = this.getDuration(deal);
			const cost = this.getCost(deal);

			const weightInfo = {
				from,
				to,
				cost,
				duration,
				discount,
				reference,
				transport,
			};

			const [fromVertex, toVertex] = this.getFromToVertices(from, to);

			const identifier = `${from}-${to}`;

			// check if it's an already added edge to the node
			// as we have multiple deals between two same nodes (bus, train, car)
			// if it's an already added edge, check if current deal's
			// duration/cost is lesser and remove previous edge with new
			if (edges[identifier]) {
				const isDurationBetter = duration < edges[identifier].duration;
				const isCostBetter = cost < edges[identifier].cost;

				if (isDurationBetter || isCostBetter) {
					graph.removeEdge(edges[identifier].edge);

					if (isDurationBetter) {
						edges[identifier].duration = duration;
					} else {
						weightInfo.duration = edges[identifier].duration;
					}

					if (isCostBetter) {
						edges[identifier].cost = cost;
					} else {
						weightInfo.cost = edges[identifier].cost;
					}

					edges[identifier].edge = graph.addEdge(fromVertex, toVertex, weightInfo);
				}
			} else {
				const edge = graph.addEdge(fromVertex, toVertex, weightInfo);

				edges[identifier] = {
					edge,
					duration,
					cost,
				};
			}

			return edges;
		}, this.deals.edges);

		this.dijkstra = new jKstra.algos.Dijkstra(graph);

		return this;
	}

	findShortestPath(from, to, sortType) {
		const [fromVertex, toVertex] = this.getFromToVertices(from, to)

		if (fromVertex && toVertex && (fromVertex !== toVertex)) {
			return this.dijkstra
				.shortestPath(fromVertex, toVertex, {
					edgeCost: (e) =>
					(sortType.toLowerCase() === "fastest")? e.data.duration : e.data.cost
				});
		}

		return null;
	}
}

export default new Deals();
