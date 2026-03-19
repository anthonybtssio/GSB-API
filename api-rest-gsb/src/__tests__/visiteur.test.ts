jest.mock('../models/Visiteur');

import { VisiteurService } from '../services/Visiteur';
import { VisiteurModel } from '../models/Visiteur';


describe('VisiteurService.createVisiteur', () => {
  let service: VisiteurService;

  beforeEach(() => {
    service = new VisiteurService();
    jest.clearAllMocks();
  });

  describe('Création d\'un visiteur réussie', () => {
    test('crée un visiteur si email libre et données valides', async () => {
      // ... (Ton code ARRANGE / ACT / ASSERT actuel pour le succès) ...
    });
  });

  describe('Création d\'un visiteur en échec', () => {
    
    test('Cas d\'erreur 1 : lance une erreur si l\'email existe déjà', async () => {
      // 1. ARRANGE
      const visiteurData = {
        nom: 'Martin', prenom: 'Paul', email: 'paul@test.com', tel: '0600000000'
      };
      
      (VisiteurModel.findOne as jest.Mock).mockResolvedValue({ email: visiteurData.email });
      
      const mockSave = jest.fn();
      (VisiteurModel as unknown as jest.Mock).mockImplementation(() => {
        return { save: mockSave }; 
      });

      // 2 & 3. ACT & ASSERT
      await expect(service.createVisiteur(visiteurData as any)).rejects.toThrow(
        `Un visiteur avec l'email ${visiteurData.email} existe déjà`
      );

      expect(VisiteurModel.findOne).toHaveBeenCalledWith({ email: visiteurData.email });
      expect(mockSave).not.toHaveBeenCalled(); 
    });

  }); 
}); 