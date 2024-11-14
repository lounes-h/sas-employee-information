import { parseCSVData } from './fileUtils';

describe('parseCSVData', () => {
    const validCSV = `First name,Last name,Location,Birthday
                    John,Doe,"New York, NY",9/23/1963
                    Jane,Smith,"Boston, MA",25-Apr-20
                    Bob,Johnson,"Chicago, IL",2-Apr-78`;

    it('parses valid CSV data correctly', async () => {
        const result = await parseCSVData(validCSV);

        expect(result).toHaveLength(3);

        expect(result[0]).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            location: 'New York, NY',
            birthday: expect.any(Date)
        });
    });

    it('handles different date formats', async () => {
        const result = await parseCSVData(validCSV);

        expect(result[0].birthday.getFullYear()).toBe(1963); // M/D/YYYY format
        expect(result[1].birthday.getFullYear()).toBe(1920); // DD-MMM-YY format
        expect(result[2].birthday.getFullYear()).toBe(1978); // D-MMM-YY format
    });

    it('handles empty CSV', async () => {
        const emptyCSV = 'First name,Last name,Location,Birthday';
        const result = await parseCSVData(emptyCSV);
        expect(result).toHaveLength(0);
    });

    it('throws error for invalid CSV format', async () => {
        const invalidCSV = 'not,proper,headers';
        try {
            await parseCSVData(invalidCSV);
            fail('Expected parseCSVData to throw an error');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('handles missing fields gracefully', async () => {
        const csvWithMissingFields = `First name,Last name,Location,Birthday
                                        ohn,,New York,9/23/1963`;

        const result = await parseCSVData(csvWithMissingFields);
        expect(result[0].lastName).toBe('');
    });

    it('trims whitespace from values', async () => {
        const csvWithWhitespace = `First name,Last name,Location,Birthday
                                    John  ,  Doe  ,"  New York, NY  ",9/23/1963`;

        const result = await parseCSVData(csvWithWhitespace);
        expect(result[0]).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            location: 'New York, NY',
            birthday: expect.any(Date)
        });
    });

    it('preserves commas within quoted fields', async () => {
        const csvWithQuotes = `First name,Last name,Location,Birthday
                                John,Doe,"Austin, TX",9/23/1963`;

        const result = await parseCSVData(csvWithQuotes);
        expect(result[0].location).toBe('Austin, TX');
    });
});