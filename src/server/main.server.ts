import { CollectionService, ProximityPromptService, Workspace } from '@rbxts/services'
import { Box } from 'shared/BoxManager'

ProximityPromptService.PromptTriggered.Connect((prompt, player) => {
	switch (prompt.Name) {
		case 'newBox':
			let box = new Box()
			box.render(player)

			Workspace.StandingPlate.Poof.Emit(25)

			break;
		case 'dropStock':
			for (let i = 0; i < math.random(3); i++) {
				Promise.delay(1).andThen(() => {

					// FIX: make this less bad, have a prefab and just clone it
					let part = new Instance('Part')
					part.Size = new Vector3(1, 1, 1).mul(math.random())
 					part.Color = Color3.fromHSV(math.random(), 1, 1)
					part.Position = Workspace.DropPart.Position
					part.Material = Enum.Material.Neon

					part.Parent = Workspace

					/*
						TODO: Check if there is a box at the end of the belt
						If there is, add some XP relative to the stock size.
						If there isn't, destroy the stock.

							* Players shouldn't be able to spawn stock if they don't have a box.
							* Rate limit stock spawning
					*/
				})
			}
			break;
	
		default:
			warn('Unhandled prompt!', prompt.GetFullName())
			break;
	}
})

let parts = CollectionService.GetTagged('AnchorInPlace') as AnchorPlate[]

parts.forEach(part => {

	part.Touched.Connect(otherPart => {
		if (otherPart.IsDescendantOf(Workspace.Boxes)) {

			// TODO: If there is a current Part1 don't weld
			otherPart.CanTouch = false
			part.Weld.Part1 = otherPart
			otherPart.Position = part.Position.add(new Vector3(0, otherPart.Position.Y / 2))
		}
	})

})