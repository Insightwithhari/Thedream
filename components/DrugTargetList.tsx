import React from 'react';
import type { DrugTarget } from '../types';

interface DrugTargetListProps {
    targets: DrugTarget[];
    pathogen: string;
}

export const DrugTargetList: React.FC<DrugTargetListProps> = ({ targets, pathogen }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-300 border-b border-blue-400/30 pb-2">
                Potential Drug Targets for <em className="italic">{pathogen}</em>
            </h3>
            {targets.map((target, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-blue-400/20 transition-shadow hover:shadow-lg hover:border-blue-400/50">
                    <h4 className="font-bold text-blue-300">{target.name}</h4>
                    <div className="mt-2 space-y-2 text-sm">
                        <p><strong className="font-medium text-gray-300">Function:</strong> {target.function}</p>
                        <p><strong className="font-medium text-gray-300">Rationale:</strong> {target.rationale}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
