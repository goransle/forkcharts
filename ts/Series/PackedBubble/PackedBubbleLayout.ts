/* *
 *
 *  (c) 2010-2021 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type PackedBubblePoint from './PackedBubblePoint';
import type PackedBubbleSeries from './PackedBubbleSeries';
import type PackedBubbleSeriesOptions from './PackedBubbleSeriesOptions';

import Layouts from '../Networkgraph/Layouts.js';
import RFLayout from '../Networkgraph/ReingoldFruchtermanLayout.js';
import U from '../../Core/Utilities.js';
const {
    pick
} = U;

/* *
 *
 *  Class
 *
 * */

class PackedBubbleLayout extends RFLayout {

    /* *
     *
     *  Properties
     *
     * */

    public enableSimulation?: boolean;
    public nodes: Array<PackedBubblePoint> = [];
    public options: PackedBubbleLayout.Options = void 0 as any;
    public series: Array<PackedBubbleSeries> = [];

    /* *
     *
     *  Functions
     *
     * */

    public beforeStep(): void {
        if (this.options.marker) {
            this.series.forEach(function (series): void {
                if (series) {
                    (series as any).calculateParentRadius();
                }
            });
        }
    }

    // #14439, new stable check.
    public isStable(): boolean {
        const tempDiff = Math.abs(
            (this.prevSystemTemperature as any) -
            (this.systemTemperature as any)
        );

        const upScaledTemperature = 10 * (this.systemTemperature as any) /
            Math.sqrt(this.nodes.length);

        return Math.abs(upScaledTemperature) < 1 &&
            tempDiff < 0.00001 ||
            (this.temperature as any) <= 0;
    }

    public setCircularPositions(): void {
        let layout = this,
            box = layout.box,
            nodes = layout.nodes,
            nodesLength = nodes.length + 1,
            angle = 2 * Math.PI / nodesLength,
            centerX,
            centerY,
            radius = layout.options.initialPositionRadius;
        nodes.forEach(function (node, index): void {
            if (
                layout.options.splitSeries &&
                !node.isParentNode
            ) {
                centerX = (node.series.parentNode as any).plotX;
                centerY = (node.series.parentNode as any).plotY;
            } else {
                centerX = box.width / 2;
                centerY = box.height / 2;
            }

            node.plotX = node.prevX = pick(
                node.plotX,
                (centerX as any) +
                (radius as any) * Math.cos(node.index || index * angle)
            );

            node.plotY = node.prevY = pick(
                node.plotY,
                (centerY as any) +
                (radius as any) * Math.sin(node.index || index * angle)
            );

            node.dispX = 0;
            node.dispY = 0;
        });
    }

    public repulsiveForces(): void {
        let layout = this,
            force,
            distanceR,
            distanceXY,
            bubblePadding = layout.options.bubblePadding;

        layout.nodes.forEach(function (node): void {
            node.degree = node.mass;
            node.neighbours = 0;
            layout.nodes.forEach(function (repNode): void {
                force = 0;
                if (
                    // Node can not repulse itself:
                    node !== repNode &&
                    // Only close nodes affect each other:

                    // Not dragged:
                    !node.fixedPosition &&
                    (
                        layout.options.seriesInteraction ||
                        node.series === repNode.series
                    )
                ) {
                    distanceXY = layout.getDistXY(node, repNode);
                    distanceR = (
                        layout.vectorLength(distanceXY) -
                        (
                            (node.marker as any).radius +
                            (repNode.marker as any).radius +
                            bubblePadding
                        )
                    );
                    // TODO padding configurable
                    if (distanceR < 0) {
                        (node.degree as any) += 0.01;
                        (node.neighbours as any)++;
                        force = layout.repulsiveForce(
                            -distanceR / Math.sqrt(node.neighbours as any),
                            layout.k,
                            node,
                            repNode
                        );
                    }

                    layout.force(
                        'repulsive',
                        node,
                        force * repNode.mass,
                        distanceXY,
                        repNode,
                        distanceR
                    );
                }
            });
        });
    }

    public applyLimitBox(
        node: PackedBubblePoint,
        box: Record<string, number>
    ): void {
        let layout = this,
            distanceXY,
            distanceR,
            factor = 0.01;

        // parentNodeLimit should be used together
        // with seriesInteraction: false
        if (
            layout.options.splitSeries &&
            !node.isParentNode &&
            layout.options.parentNodeLimit
        ) {
            distanceXY = layout.getDistXY(
                node,
                node.series.parentNode as any
            );
            distanceR = (
                (node.series.parentNodeRadius as any) -
                (node.marker as any).radius -
                layout.vectorLength(distanceXY)
            );
            if (
                distanceR < 0 &&
                distanceR > -2 * (node.marker as any).radius
            ) {
                (node.plotX as any) -= distanceXY.x * factor;
                (node.plotY as any) -= distanceXY.y * factor;
            }
        }

        super.applyLimitBox(node, box);
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

namespace PackedBubbleLayout {

    export interface Options extends RFLayout.Options {
        bubblePadding?: number;
        dragBetweenSeries?: boolean;
        enableSimulation?: boolean;
        friction?: number;
        gravitationalConstant?: number;
        initialPositionRadius?: number;
        marker?: PackedBubbleSeriesOptions['marker'];
        maxIterations?: number;
        maxSpeed?: number;
        parentNodeLimit?: boolean;
        parentNodeOptions?: Options;
        seriesInteraction?: boolean;
        splitSeries?: boolean;
    }
}

/* *
 *
 *  Registry
 *
 * */

declare module '../Networkgraph/LayoutType' {
    interface LayoutTypeRegistry {
        packedbubble: typeof PackedBubbleLayout;
    }
}
Layouts.types.packedbubble = PackedBubbleLayout;

/* *
 *
 *  Default Export
 *
 * */

export default PackedBubbleLayout;