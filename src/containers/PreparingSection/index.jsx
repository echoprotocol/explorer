import React from 'react';
import Media from 'react-media';
import SimplePreparingBlock from './PreparingBlock/SimplePreparingBlock';
import CompositePreparingBlock from './PreparingBlock/CompositePreparingBlock';

import Loader from './Loader';

class PreparingSection extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div className="wrap">
					<div className="preparing-section">
						<Media query="(max-width: 499px)">
							{(matches) =>
								(matches ? (
									<p className="mobile-title">Preparing block</p>
								) : (
									<SimplePreparingBlock title="Preparing block" description="1,265,457" />
								))
							}
						</Media>

						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<CompositePreparingBlock composite title="Producing block" currentStep="1" totalStep="3" description="Producers: 12/12" status="done" tooltip />
								) : (
									<React.Fragment>
										<SimplePreparingBlock title="Producing block" description="Producers: 12/12" status="done" tooltip />
										<SimplePreparingBlock className="sm-border" title="Verifying block: GC" smallTitle="Verifying: GC" description="Verifying" status="progress" tooltip />
										<SimplePreparingBlock title="Verifying block: BBA" smallTitle="Verifying: BBA" description="Pending" tooltip />
									</React.Fragment>
								))
							}
						</Media>
					</div>
				</div>
				<Loader status="40" />
			</React.Fragment>
		);
	}

}

export default PreparingSection;
