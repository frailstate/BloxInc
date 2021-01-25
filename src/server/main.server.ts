import { ProximityPromptService, Workspace } from '@rbxts/services'
import { Box } from 'shared/BoxManager'

ProximityPromptService.PromptTriggered.Connect((prompt, player) => {
	switch (prompt.Name) {
		case 'newBox':
			let box = new Box()
			box.render(player)

			Workspace.StandingPlate.Poof.Emit(25)

			break;
	
		default:
			warn('Unhandled prompt!', prompt.GetFullName())
			break;
	}
})