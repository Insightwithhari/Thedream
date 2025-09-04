import React, { useEffect, useRef, memo } from 'react';
import type { VisualizationAction } from '../types';

declare global {
    interface Window {
        $3Dmol?: any;
    }
}

interface ProteinViewerProps {
    pdbId: string;
    actions?: VisualizationAction[];
}

export const ProteinViewer: React.FC<ProteinViewerProps> = memo(({ pdbId, actions }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const viewerInstance = useRef<any>(null);

    useEffect(() => {
        if (viewerRef.current && window.$3Dmol) {
            try {
                // If a viewer instance doesn't exist, create it.
                if (!viewerInstance.current) {
                    viewerInstance.current = window.$3Dmol.createViewer(viewerRef.current, {
                        defaultcolors: window.$3Dmol.rasmolElementColors,
                    });
                }
                
                const viewer = viewerInstance.current;
                viewer.clear(); // Clear previous model
                
                viewer.addModel(pdbId, 'pdb').then(() => {
                    if (actions && actions.length > 0) {
                         actions.forEach(action => {
                            switch(action.action) {
                                case 'setStyle':
                                    viewer.setStyle(action.selection, action.style);
                                    break;
                                case 'addHBonds':
                                    viewer.addHBonds(action.selection, action.selection2 || {}, action.style);
                                    break;
                                case 'zoomTo':
                                    viewer.zoomTo(action.selection);
                                    break;
                                case 'addLabel':
                                    viewer.addLabel(action.label, {
                                        ...action.style,
                                        infront: true,
                                        alignment: 'bottomCenter',
                                    }, action.selection);
                                    break;
                            }
                        });
                    } else {
                        // Default view for simple PDB display
                        viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
                    }
                    viewer.zoomTo();
                    viewer.render();
                });

            } catch(e) {
                console.error("Failed to create 3Dmol viewer", e);
                if (viewerRef.current) {
                    viewerRef.current.innerHTML = `<div class="flex items-center justify-center h-full text-red-400 p-4">Error loading PDB ${pdbId}. Please check the ID and try again.</div>`;
                }
            }
        }
        
        // No cleanup needed for the viewer instance itself, as we reuse it.
    }, [pdbId, actions]);

    return (
        <div className="relative w-full h-96 bg-gray-900 rounded-lg border border-blue-400/30 mt-2">
            <div ref={viewerRef} className="w-full h-full" />
            <div className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs px-2 py-1 rounded">
                PDB ID: {pdbId}
            </div>
        </div>
    );
});
